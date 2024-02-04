import { createContext } from "react";

interface IContentProps{
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
}

const KinContext = createContext<IContentProps | undefined>(undefined)

export default KinContext;