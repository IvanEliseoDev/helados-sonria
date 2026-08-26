export interface MongoError {
  code: number;
  keyValue: Record<string, any>;
}