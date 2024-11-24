import { TipoReformaDes } from "../enums/tipoReformaDes.enum";
import { TipoReformaId } from "../enums/tipoReformaId.enum";

export interface TipoReforma {
    id: TipoReformaId;
    descripcion: TipoReformaDes;
}
