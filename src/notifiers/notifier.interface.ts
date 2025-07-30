export interface Notifier {
  sendMessage(message: string): Promise<void>;
  sendError(message: string): Promise<void>;
}
