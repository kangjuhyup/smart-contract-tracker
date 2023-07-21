import { Controller, Get, Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {

    constructor(
    ) {}
    
    @Post('set-contract')
    setContract() {
        return '';
    }    

    @Post('set-database')
    setDatabase() {
        return '';
    }

    @Get('contract-info')
    getContractInfo() {

    }

    @Get('database-info')
    getDatabaseInfo() {
        
    }
}
