function InfoCard(
{txt1="",txt2="",Icon=<></>}
){
    return <div className=" bg-white rounded-md  px-2 py-4">
        <div className=" flex justify-between gap-x-2">
            <span className=" text-black  bg-secondary p-2 rounded-md border-2 border-primary text-4xl">{Icon}</span>
            <div className=" flex flex-col">
                <span className=" text-2xl font-light">{txt1}</span>
                <span className=" text-xl font-extrabold text-primary">{txt2}</span>
            </div>
        </div>
        
    </div>
}


export default InfoCard