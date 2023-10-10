import { Permission } from '@strangereal/util-constants';
import { Reflector } from '@nestjs/core';

// TODO create support for more complex operators and stuff (and + or)
export const RequirePermission = Reflector.createDecorator<Permission>();
