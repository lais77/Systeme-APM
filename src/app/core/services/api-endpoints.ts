import { environment } from '../../../environments/environment';

const BASE = environment.apiUrl;

export const API = {
  auth: {
    login: `${BASE}/auth/login`,
    logout: `${BASE}/auth/logout`,
    forgotPassword: `${BASE}/auth/forgot-password`,
    resetPassword: `${BASE}/auth/reset-password`,
  },
  users: {
    getAll: `${BASE}/users`,
    getById: (id: number) => `${BASE}/users/${id}`,
    create: `${BASE}/users`,
    update: (id: number) => `${BASE}/users/${id}`,
    deactivate: (id: number) => `${BASE}/users/${id}/desactiver`,
    logs: (id: number) => `${BASE}/users/${id}/logs`,
  },
  departements: {
    getAll: `${BASE}/departments`,
    create: `${BASE}/departments`,
    update: (id: number) => `${BASE}/departments/${id}`,
    delete: (id: number) => `${BASE}/departments/${id}`,
  },
  processus: {
    getAll: `${BASE}/processes`,
    create: `${BASE}/processes`,
    update: (id: number) => `${BASE}/processes/${id}`,
    delete: (id: number) => `${BASE}/processes/${id}`,
  },
  plans: {
    getAll: `${BASE}/plans`,
    getMes: `${BASE}/plans/mes-plans`,
    getById: (id: number) => `${BASE}/plans/${id}`,
    create: `${BASE}/plans`,
    update: (id: number) => `${BASE}/plans/${id}`,
    cloturer: (id: number) => `${BASE}/plans/${id}/cloturer`,
  },
  actions: {
    getByPlan: (planId: number) => `${BASE}/plans/${planId}/actions`,
    getMes: `${BASE}/actions/mes-actions`,
    getById: (id: number) => `${BASE}/actions/${id}`,
    create: (planId: number) => `${BASE}/plans/${planId}/actions`,
    update: (id: number) => `${BASE}/actions/${id}`,
    delete: (id: number) => `${BASE}/actions/${id}`,
    submit: (id: number) => `${BASE}/actions/${id}/submit`,
    validate: (id: number) => `${BASE}/actions/${id}/valider`,
    reject: (id: number) => `${BASE}/actions/${id}/rejeter`,
    evaluate: (id: number) => `${BASE}/actions/${id}/evaluer`,
    historique: (id: number) => `${BASE}/actions/${id}/historique`,
  },
  commentaires: {
    getByAction: (actionId: number) => `${BASE}/actions/${actionId}/commentaires`,
    add: (actionId: number) => `${BASE}/actions/${actionId}/commentaires`,
    delete: (id: number) => `${BASE}/commentaires/${id}`,
  },
  fichiers: {
    getByAction: (actionId: number) => `${BASE}/actions/${actionId}/fichiers`,
    upload: (actionId: number) => `${BASE}/actions/${actionId}/fichiers`,
    download: (id: number) => `${BASE}/fichiers/${id}/download`,
    delete: (id: number) => `${BASE}/fichiers/${id}`,
  },
  notifications: {
    getMes: `${BASE}/notifications/my`,
    markRead: (id: number) => `${BASE}/notifications/${id}/read`,
    markAllRead: `${BASE}/notifications/read-all`,
  },
  stats: {
    global: `${BASE}/stats/global`,
    byDepartement: `${BASE}/stats/by-departement`,
    byPilote: `${BASE}/stats/by-pilote`,
    byPeriode: `${BASE}/stats/by-periode`,
    performance: `${BASE}/stats/performance`,
    export: {
      pdf: `${BASE}/export/pdf`,
      excel: `${BASE}/export/excel`,
    }
  }
};