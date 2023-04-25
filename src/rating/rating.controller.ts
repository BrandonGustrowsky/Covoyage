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
import { RatingService } from './rating.service'
import { CreateRatingDto } from './dto/create-rating.dto'
import { UpdateRatingDto } from './dto/update-rating.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('rating')
@ApiTags("rating")
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    /**
     * Creates a new rating
     * @param createRatingDto The create object for a rating
     * @returns The created rating
     */
    @Post()
    @ApiOperation({ summary: "This endpoint creates a new rating." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({
        description: "A new rating",
        // schema: {
        //     example: {

        //     }
        // }
    })
    create(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.create(createRatingDto)
    }

    /**
     * Fetches all ratings
     * @returns An array of all ratings
     */
    @Get()
    @ApiOperation({ summary: "This endpoint retrieves all ratings." })
    @ApiResponse({ status: 200, description: "Success" })
    findAll() {
        return this.ratingService.findAll()
    }

    /**
     * Fetches a single rating by its id
     * @param id The id of a rating
     * @returns A single rating
     */
    @Get(':id')
    @ApiOperation({ summary: "This endpoint retrieves a single rating by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    findOne(@Param('id') id: string) {
        return this.ratingService.findOne(+id)
    }

    /**
     * Performs complete replacement on a rating object
     * @param id The id of a rating
     * @param updateRatingDto The update object of a rating
     * @returns The updated rating
     */
    @Put(':id')
    @ApiOperation({ summary: "This endpoint performs complete replacement on a rating's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
        return this.ratingService.put(+id, updateRatingDto)
    }

    /**
     * Performs partial replacement on a rating object
     * @param id The id of a rating
     * @param updateRatingDto The update object of a rating
     * @returns The updated rating
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a rating's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    patch(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
        return this.ratingService.patch(+id, updateRatingDto)
    }

    /**
     * Deletes a rating
     * @param id The id of a rating
     * @returns The deleted rating
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a rating." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.ratingService.remove(+id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the user who created the rating
     * @param id The id of a rating
     * @returns The user who created the rating
     */
    @Get('/creator/:id')
    @ApiOperation({ summary: "This endpoint gets the creator of a rating." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getCreator(@Param('id') id: string) {
        return this.ratingService.getCreator(+id)
    }

    /**
     * Gets the station the rating was created for
     * @param id The id of a rating
     * @returns The station the rating was created for
     */
    @Get('/station/:id')
    @ApiOperation({ summary: "This endpoint gets the station a rating was made on." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getStation(@Param('id') id: string) {
        return this.ratingService.getStation(+id)
    }

    /**
     * Fetches the comment the rating was created for
     * @param id The id of a rating
     * @returns The comment a rating was created for
     */
    @Get('/comment/:id')
    @ApiOperation({ summary: "This endpoint gets the comment a rating was made on." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getComment(@Param('id') id: string) {
        return this.ratingService.getComment(+id)
    }
}
