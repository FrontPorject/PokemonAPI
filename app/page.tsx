"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import pokemonDetails from "./Pokemon"
import { Tilt } from 'react-tilt'

export default function Home() {

  const [data,setData] = useState<any>({});
  const [info,setInfo] = useState<any>(null);
  
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
        setInfo(pokemonInfo)

        pokemonInfo?.results.forEach((pokemon: any) => {
          fetchDesirePokemon(pokemon.name);
        });
      }
      catch(error){
        console.error("ERROR",error)
      }
    }

    fetchInfo()

  },[])
  async function fetchDesirePokemon(name:string) {
    try{
      if (!data[name]) {
        const eachPokemonInfo = await pokemonDetails.apiEachInfo(name);
        setData((prevData: any) => ({
          ...prevData,
          [name]: eachPokemonInfo,
        }));
      }
    }
    catch(error){
      console.error("ERROR `Can't fetch data`",error)
    }
  }

  return (
    <>
    <div className="flex flex-col items-center gap-6">
      <Image alt="PokéAPI" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" width={200} height={200}/>

    <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7">

      {info?.results?.map((select:any)=>{ 
          fetchDesirePokemon(select.name)
        return (
          <button key={select.name}>
          <Tilt options={defaultOptions}  className="bg-gradient-to-r from-[#2DF2FF] to-[#DDFF95] rounded-2xl flex flex-col items-center justify-center">
            <div className="m-4 p-5 flex flex-col items-center gap-4">
              <Image className="w-[100px] h-[100px]" src={data[select.name]?.sprites?.other?.dream_world?.front_default || "https://img.icons8.com/?id=pn2cjKpf9DEt&format=png&color=000000"} alt={select.name} width={100} height={100}/>
              <h3>{select.name}</h3>
            </div>
          </Tilt>
          </button>
        )
      })}
    </section>
    </div>



    </>
  );
}
