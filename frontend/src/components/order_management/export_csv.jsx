import exportFromJSON from 'export-from-json'
import download_icon_blue from "../../assets/download_icon_blue.png"


function ExportCsv(props) {
    
    const data = props.data;
    const fileName = props.fileName
    function exportClick() {
        try {
            console.log(props.fileName);
            const exportType = exportFromJSON.types.csv;
            exportFromJSON({ data, fileName, exportType });
        } catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            <button
                className="items-center content-center flex w-24 me-2 bg-[#7450DF]/15 rounded-lg h-10"
                onClick={() => exportClick()}
            >
                <span className='flex text-[#7450DF] pl-3'><img className="" src={download_icon_blue}></img><p className='ml-1'>Export</p></span>
            </button>
        </div>
    )
}

export default ExportCsv;