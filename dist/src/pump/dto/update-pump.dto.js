"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePumpDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pump_dto_1 = require("./create-pump.dto");
class UpdatePumpDto extends (0, mapped_types_1.PartialType)(create_pump_dto_1.CreatePumpDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePumpDto = UpdatePumpDto;
//# sourceMappingURL=update-pump.dto.js.map