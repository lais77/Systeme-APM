import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles: string[] = route.data['roles'];
  const user = authService.getCurrentUser();

  if (user && expectedRoles.includes(user.role)) return true;

  router.navigate(['/auth/login']);
  return false;
};