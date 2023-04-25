import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from '@nestjs/common'
import { StationService } from './station.service'
import { CreateStationDto } from './dto/create-station.dto'
import { UpdateStationDto } from './dto/update-station.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('station')
@ApiTags("station")
export class StationController {
    constructor(private readonly stationService: StationService) {}

    @Post()
    @ApiOperation({summary: "This endpoint creates a new station."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    create(@Body() createStationDto: CreateStationDto) {
        return this.stationService.create(createStationDto)
    }

    /**
     * Fetches all stations
     * @returns All stations
     */
    @Get()
    @ApiOperation({ summary: "This endpoint retrieves all stations."})
    @ApiResponse({ status: 200, description: "Success" })
    findAll() {
        return this.stationService.findAll()
    }

    /**
     * Fetches a station by their id
     * @param id The id of a station
     * @returns A single station
     */
    @Get(':id')
    @ApiOperation({ summary: "This endpoint retrieves a single user by their id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    findOne(@Param('id') id: string) {
        return this.stationService.findOne(id)
    }

    /**
     * Updates a station with total replacement
     * @param id The id of a station
     * @param updateStationDto The update object of a station
     * @returns The updated station
     */
    @Put(':id')
    @ApiOperation({ summary: "This endpoint performs complete replacement on a station's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(
        @Param('id') id: string,
        @Body() updateStationDto: UpdateStationDto,
    ) {
        return this.stationService.put(id, updateStationDto)
    }

    /**
     * Performs partial replacement on a station's fields
     * @param id The id of a station
     * @param updateStationDto The update object of a station
     * @returns The updated station
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a station's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    patch(
        @Param('id') id: string,
        @Body() UpdateStationDto: UpdateStationDto,
    ) {
        return this.stationService.patch(id, UpdateStationDto)
    }

    /**
     * Deletes a station
     * @param id The id of a station
     * @returns The deleted station
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.stationService.remove(id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Gets all forums about a single station
     * @param id The id of a station
     * @returns All the forums created for that station
     */
    @Get('/forums/:id')
    @ApiOperation({ summary: "This endpoint gets all the forums made in a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getForums(@Param('id') id: string) {
        return this.stationService.getForums(id)
    }

    /**
     * Gets the creator of a single station
     * @param id The id of a station
     * @returns All the forums created for that station
     */
    @Get('/creator/:id')
    @ApiOperation({ summary: "This endpoint gets the creator of a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getCreator(@Param('id') id: string) {
        return this.stationService.getCreator(id)
    }

    /**
     * Returns all ratings of a provided station
     * @param id The id of a station
     * @returns All the ratings for the provided station
     */
    @Get('/ratings/:id')
    @ApiOperation({ summary: "This endpoing gets all the ratings made on a station." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getRatings(@Param('id') id: string) {
        return this.stationService.getRatings(id)
    }

    /**
     * Fetches all pumps on a single station
     * @param id The id of a station
     * @returns All the pumps for a provided station
     */
    @Get('/pumps/:id')
    @ApiOperation({ summary: "This endpoing gets all the pumps a station has." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getPumps(@Param('id') id: string) {
        return this.stationService.getPumps(id)
    }
}
