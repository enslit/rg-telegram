export interface ISceneConfig {
  command: string;
  description: string;
  sceneId: string;
}

export enum Scenes {
  ShowLogs = 'showLogs',
  EditLog = 'editLog',
}

export const SCENES: Record<Scenes, ISceneConfig> = {
  showLogs: {
    command: 'show_logs',
    description: 'Показать список зарегистрированных проходов',
    sceneId: 'logs',
  },
  editLog: {
    command: 'edit_log',
    description: 'Редактировать время прохода',
    sceneId: 'edit_log',
  },
};
