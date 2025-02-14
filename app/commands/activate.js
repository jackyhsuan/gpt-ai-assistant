import config from '../../config/index.js';
import { COMMAND_ACTIVATE } from '../../constants/command.js';
import { SETTING_AI_ACTIVATED } from '../../constants/setting.js';
import storage from '../../storage/index.js';
import Context from '../context.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const isActivateCommand = (context) => context.isCommand(COMMAND_ACTIVATE);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const execActivateCommand = async (context) => {
  if (!config.VERCEL_ACCESS_TOKEN) context.pushText('Missing environment variable: VERCEL_ACCESS_TOKEN');
  try {
    await storage.setItem(SETTING_AI_ACTIVATED, true);
    context.pushText(COMMAND_ACTIVATE.reply);
  } catch (err) {
    context.pushError(err);
  }
  return context;
};

export {
  isActivateCommand,
  execActivateCommand,
};
