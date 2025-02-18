"use client"
import Image from "next/image";
import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState} from "./store/index";
import { setInfo, setSpecificInfo , setOpenComponent , setNameForModal } from "./store/redux-mainPage";
import pokemonDetails from "./Pokemon"
import { Tilt } from 'react-tilt'
import Card from "./components/Card";

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const info = useSelector((state:RootState)=>state.apiInfo.info)
  const SpecificInfo = useSelector((state:RootState)=>state.apiInfo.SpecificInfo)
  const openComponent = useSelector((state:RootState)=>state.apiInfo.openComponent)
  
  const defaultOptions = {
    reverse:        false,
    max:            35,
    perspective:    1000,
    scale:          1.1,
    speed:          1000,
    transition:     true,
    axis:           null,
    reset:          true,
    easing:         "cubic-bezier(.03,.98,.52,.99)",
  }
  
  useEffect(()=>{
    async function fetchInfo() {
      try{
        const pokemonInfo = await pokemonDetails.api()
        dispatch(setInfo(pokemonInfo));

        pokemonInfo?.results.forEach((pokemon: Record<string,string>) => {
          fetchDesirePokemon(pokemon.name);
        });
      }
      catch(error){
        console.error("ERROR",error)
      }
    }

    fetchInfo()

  },[dispatch])
  async function fetchDesirePokemon(name:string) {
    try{
      if (!SpecificInfo[name]) {
        const eachPokemonInfo = await pokemonDetails.apiEachInfo(name);
        dispatch(setSpecificInfo({ name, data: eachPokemonInfo }));
      }
    }
    catch(error){
      console.error("ERROR `Can't fetch data`",error)
    }
  }

  return (
    <>
    <div className="flex flex-col items-center gap-6" style={{opacity: openComponent ? 0.5 : 1 }}>
      <Image className="w-[200px]" alt="PokéAPI" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" width="0" height="0" sizes="100vw" priority/>

    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7">

      {info?.results?.map((select:Record<string,string>)=>{ 
          fetchDesirePokemon(select.name)
        return (
          <button key={select.name} onClick={()=>dispatch(setOpenComponent(true)) &&dispatch(setNameForModal(select.name))} disabled={openComponent}>
          {!openComponent ? <Tilt options={defaultOptions}  className="bg-gradient-to-r from-[#3461FF] to-[#8454EB] rounded-2xl flex flex-col items-center justify-center">
            <div className="m-4 p-5 flex flex-col items-center gap-4">
              <Image className="w-[100px] h-[100px]" src={SpecificInfo[select.name]?.sprites?.other?.dream_world?.front_default as string || "https://img.icons8.com/?id=pn2cjKpf9DEt&format=png&color=000000"} alt={select.name} width="0" height="0" sizes="100vw" priority/>
              <h3>{select.name}</h3>
            </div>
          </Tilt> : <div className="bg-gradient-to-r from-[#3461FF] to-[#8454EB] rounded-2xl flex flex-col items-center justify-center">
          <div className="m-4 p-5 flex flex-col items-center gap-4">
              <Image className="w-[100px] h-[100px]" src={SpecificInfo[select.name]?.sprites?.other?.dream_world?.front_default as string || "https://img.icons8.com/?id=pn2cjKpf9DEt&format=png&color=000000"} alt={select.name}width="0" height="0" sizes="100vw" priority/>
              <h3>{select.name}</h3>
            </div>
            </div>
            }
          </button>
        )
      })}
    </section>
    </div>
    {openComponent && <Card/>}
    </>
  );
}
