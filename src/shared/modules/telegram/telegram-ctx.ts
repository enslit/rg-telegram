import { Deunionize } from 'telegraf/typings/deunionize';
import { LogMessageSubType } from '../rusguard-dabatase';
import { Context, Scenes } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

/**
 * It is possible to extend the session object that is available to each scene.
 * This can be done by extending `SceneSessionData` and in turn passing your own
 * interface as a type variable to `SceneSession` and to `SceneContextScene`.
 */
export interface EditLogSession extends Omit<Scenes.SceneSessionData, 'state'> {
  logId?: number;
  logSubType?: LogMessageSubType;
  customPeriodStart?: string;
  customPeriodEnd?: string;
  state: {
    startPeriod?: string;
    endPeriod?: string;
    mapLogs?: Record<string, string>;
    logId?: string;
  };
}

/**
 * We can define our own context object.
 *
 * We now have to set the scene object under the `scene` property. As we extend
 * the scene session, we need to pass the type in as a type variable.
 */
export interface TGContext<
  S extends Scenes.SceneSessionData,
  U extends Deunionize<Update> = Update,
> extends Context<U> {
  employeeId: string;

  scene: Scenes.SceneContextScene<TGContext<S>, S>;
}
