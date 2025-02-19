import Image from "next/image";
import { AppDispatch , RootState } from "../store/index";
import { useSelector,useDispatch } from "react-redux";
import { setOpenCart } from "../store/redux-mainPage";
import { deleteProduct } from '../store/redux-cart'
export default function Cart(){
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.counter.items)
    return( 
        <div className="bg-white/0 shadow-lg ring-1 ring-black/5 backdrop-blur-3xl fixed m-auto flex flex-col inset-0 rounded-lg items-end w-5/6 md:w-2/6 opacity-1 gap-4 h-fit max-h-[70vh] overflow-y-auto">

            <Image onClick={()=>{dispatch(setOpenCart(false))}} className="w-[30px] h-[30px]" sizes="100vw" src="https://img.icons8.com/?size=100&id=63688&format=png&color=000000" alt="close" width="0" height="0" priority/>
        {items.length < 1?
            <p className="self-center mb-10 gap-20">NO PRODUCTS</p> : 
            <div className="flex flex-col justify-between m-auto mb-2 w-full">
                {items.map((select)=>{
                    return(
                        <div className="flex justify-between items-center gap-[50px] bg-white rounded p-4 m-2 hover:bg-yellow-200" key={select.name}>
                            <p>{select.name}</p>
                            <p>x{select.count}</p>
                            <button onClick={()=>{dispatch(deleteProduct({name: select.name, count: select.count}))}}><Image className="w-full h-[30px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" sizes="100vw" src="https://img.icons8.com/?size=100&id=102550&format=png&color=000000" alt="remove" width="0" height="0" priority/></button>
                        </div>
                    )
                })}
            </div>
        }
     
        </div>
    )

}