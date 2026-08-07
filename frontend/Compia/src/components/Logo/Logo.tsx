import {getImageUrl} from "../../helpers/imageHelper.ts";

function Logo(){

    return (
        <div>
            <a>
                <img className="w-35 ml-2 cursor-pointer"
                     src={getImageUrl("logo.png",
                         "https://res.cloudinary.com/l7n5c7ue/image/upload/v1786073990/logo_tehcxw.png")}
                     alt="Logo do Compia"/>
            </a>
        </div>
    )
}


export default Logo