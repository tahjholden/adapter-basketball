import manifest from "./manifest"; // placeholder, adapt if you have a different file
import runtime from "./runtime";     // placeholder
export interface VerticalAdapter {
  id: string;
  registerSchemas(): Promise<void>;
  registerAgents(): void;
  registerPipelines(): void;
  providers?: {
    drills?: { list(q:any):Promise<any[]>; get(id:string):Promise<any> };
    sessions?: { list(q:any):Promise<any[]>; get(id:string):Promise<any> };
    plans?: { list(q:any):Promise<any[]>; get(id:string):Promise<any> };
  };
  uiConfig?: Record<string, unknown>;
}
const adapter: VerticalAdapter = {
  id: "basketball",
  async registerSchemas() {},
  registerAgents() {},
  registerPipelines() {},
};
export default adapter;
export { manifest, runtime };
