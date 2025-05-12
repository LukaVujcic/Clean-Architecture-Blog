"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toDto(user) {
        return {
            id: user.getId().toString(),
            username: user.getUsername(),
            email: user.getEmail()
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map