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
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// import { ExcludeGetInterceptor } from 'src/middleware/ExcludeGetInterceptor'

@Controller('user')
// @UseInterceptors(ExcludeGetInterceptor)
@ApiTags("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Creates a new user
     * @param createUserDto The create object of a user
     * @returns The newly created user
     */
    @Post()
    @ApiOperation({ summary: "This endpoint creates a new user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    /**
     * Fetches all users
     * @returns An array of all users wrapped in a Promise
     */
    @Get()
    @ApiOperation({ summary: "Retrieves all users" })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiBody({
        // description: "Returns an array of user entities.",
        type: CreateUserDto,
    })
    //FIXME ==> What does ApiBody do?
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: "Retrives a single user by their id "})
    @ApiResponse({ status: 200, description: "Success" })
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    /**
     * Updates a user
     * @param id The id of a user
     * @param updateUserDto An object containing user properties
     * @returns The updated user
     */
    @Put(':id')
    @ApiOperation({ summary: "Performs complete replacement of a user's properties "})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.put(id, updateUserDto)
    }

    /**
     * Updates a user without total replacement
     * @param id The id of a user
     * @param updateUserDto An object containing user properties
     * @returns The updated user
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a user's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.patch(id, updateUserDto)
    }

    /**
     * Deletes a user
     * @param id 'The id of a user'
     * @returns The deleted user
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Gets all the ratings a user has given
     * @param id The id of a user
     * @returns The ratings a user has given
     */
    @Get('ratings/:id')
    @ApiOperation({ summary: "This endpoint gets all the ratings made by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getRatings(@Param('id') id: string) {
        return this.userService.getRatings(id)
    }

    /**
     * Gets all the stations a user has given
     * @param id The id of a user
     * @returns The stations a user has created
     */
    @Get('stations/:id')
    @ApiOperation({ summary: "This endpoint gets all the stations made by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getStations(@Param('id') id: string) {
        return this.userService.getStations(id)
    }

    /**
     * Gets all the pumps a user has given
     * @param id The id of a user
     * @returns The pumps a user has created
     */
    @Get('pumps/:id')
    @ApiOperation({ summary: "This endpoint gets all the pumps made by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getPumps(@Param('id') id: string) {
        return this.userService.getPumps(id)
    }

    /**
     * Gets all the comments a user has created
     * @param id The id of a user
     * @returns The comments a user has created
     */
    @Get('/comments/:id')
    @ApiOperation({ summary: "This endpoint gets all the comments created by a user." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getComments(@Param('id') id: string) {
        return this.userService.getComments(id)
    }

    /**
     * Gets all the forums a user has created
     * @param id The id of a user
     * @returns All the forums a user has created
     */
    @Get('/forums/:id')
    @ApiOperation({ summary: "This endpoint retrieves all forums created by a user."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getForums(@Param('id') id: string) {
        return this.userService.getForums(id)
    }

    /**
     * Gets all the forums a user has created
     * @param id The id of a user
     * @returns All the forums a user has created
     */
    @Get('/payment/:id')
    @ApiOperation({ summary: "This endpoint retrieves all payment types created by a user."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getPaymentTypes(@Param('id') id: string) {
        return this.userService.getPaymentTypes(id)
    }
}
