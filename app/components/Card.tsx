import Image from "next/image";
import { AppDispatch , RootState } from "../store/index";
import { useSelector,useDispatch } from "react-redux";
import { setOpenComponent } from "../store/redux-mainPage";
import pokemonDetails from "../Pokemon"
import { useState } from "react";
export default function Card(){
    const dispatch = useDispatch<AppDispatch>();
    const NameOfModal = useSelector((state:RootState)=>state.apiInfo.NameOfModal)
    const [details, setDetails] = useState<{sprites?:{other?:{dream_world?: {front_default?: string;};};};types?: {type: {name: string;};}[];} | null>(null);
  

    fetchDesirePokemon(NameOfModal).then(data => {
        setDetails(data);
    });

    async function fetchDesirePokemon(name:string) {
        try{
            const eachPokemonInfo = await pokemonDetails.apiEachInfo(name);
            return eachPokemonInfo
          }
        catch(error){
          console.error("ERROR `Can't fetch data`",error)
        }
    }

    return( 
        <div className="bg-white/0 shadow-lg ring-1 ring-black/5 backdrop-blur-3xl  fixed m-auto flex flex-col inset-0 rounded-lg items-end w-5/6 md:4/6 md:w-3/6 h-3/6 opacity-1">
            <Image onClick={()=>{dispatch(setOpenComponent(false))}} className="w-[30px] h-[30px]" src="https://img.icons8.com/?size=100&id=63688&format=png&color=000000" alt="close" width={20} height={20}/>
            <div className="self-center flex flex-col items-center gap-5">
                <Image src={details?.sprites?.other?.dream_world?.front_default || "https://img.icons8.com/?id=pn2cjKpf9DEt&format=png&color=000000"} width={150} height={100} alt={NameOfModal}/>

                <h2>{`type(s): ${details?.types?.map((index: { type: { name: string; }; }) =>index.type.name)}`}</h2>
            </div>

            
        </div>
    )

}