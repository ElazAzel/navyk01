import { SetMetadata, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

export enum Role {
	Student = 'student',
	Mentor = 'mentor',
	University = 'university',
	Employer = 'employer',
	Admin = 'admin',
}

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

@Injectable()
export class RolesGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const user = request.user
		const required: Role[] = Reflect.getMetadata(ROLES_KEY, context.getHandler()) || []
		if (!required.length) return true
		return required.includes(user?.role)
	}
}
