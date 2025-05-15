import { Controller, Get, Query, Param } from '@nestjs/common';
import * as fs from 'fs';
import * as readline from 'readline';
import { safeRun } from 'src/status/safe-run';
import { promisify } from 'util';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger'; // CHANGE !!
import { JwtAuth } from 'src/auth/auth.decorator';

@ApiTags('logs') // CHANGE !!
@Controller('logs')
export class LogsController {
    @JwtAuth()
    @Get('error/:lines')
    @ApiParam({ name: 'lines', type: Number, description: 'Number of error log lines to retrieve' }) // CHANGE !!
    @ApiResponse({ // CHANGE !!
        status: 200,
        description: 'Returns the last N lines from the error log file'
    }) // CHANGE !!
    async getErrorLogs(@Param('lines') lines: number) {
        return await safeRun(this.readLastLines('src/logs/app-err.log', lines));
    }
    @JwtAuth()
    @Get('output/:lines')
    @ApiParam({ name: 'lines', type: Number, description: 'Number of output log lines to retrieve' }) // CHANGE !!
    @ApiResponse({ // CHANGE !!
        status: 200,
        description: 'Returns the last N lines from the output log file'
    }) // CHANGE !!
    async getOutputLogs(@Param('lines') lines: number) {
        return await safeRun(this.readLastLines('src/logs/app-out.log', lines));
    }

    private async readLastLines(filePath: string, lines: number): Promise<string[]> {
        const fileExists = promisify(fs.exists);
        if (!await fileExists(filePath)) {
            return [];
        }

        const logLines = [];
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            logLines.push(line);
            if (logLines.length > lines) {
                logLines.shift();
            }
        }

        return logLines;
    }
}
