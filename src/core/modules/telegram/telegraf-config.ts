export interface ITelegramConfig {
  telegramBotToken: string;
}

export default (): ITelegramConfig => ({
  telegramBotToken: String(process.env.TELEGRAM_BOT_TOKEN),
});
