import { Ability } from '@casl/ability';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum Subject {
  All = 'all',
  Users = 'users',
}

export type AppAbility = Ability<[Action, Subject]>;

export type AuthorizationMap = Partial<Record<Subject, Action>>;

type AuthorizationHandlerCallback = (ability: AppAbility) => boolean;

export type AuthorizationHandler =
  | AuthorizationMap[]
  | AuthorizationHandlerCallback;
