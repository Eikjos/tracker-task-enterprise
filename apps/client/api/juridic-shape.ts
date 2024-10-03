import type { JuridicShapeModel } from "@repo/models";
import client from "./client";

export const getAllJuridicShape = () =>
  client.get("api/juridic-shapes").json<JuridicShapeModel[]>();
