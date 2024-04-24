import exportFromJSON from 'export-from-json'
import download_icon_blue from "../../assets/download_icon_blue.png"


function ExportCsv(props) {
    
    const data = props.data;
    function onExportClick() {
        const fileName = 'order_data';
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({data, fileName, exportType});
    }

    return (
        <button
            className="items-center content-center flex w-24 me-2 bg-[#7450DF]/15 rounded-lg h-10"
            onClick={() => onExportClick}
        >
            <span className='flex text-[#7450DF] pl-3'><img className="" src={download_icon_blue}></img><p className='ml-1'>Export</p></span>
        </button>
    )
}

export default ExportCsv;