import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

const ChatWidget = () => {
    return (
        <div className="bottom-10"> 
            <WhatsAppWidget
                phoneNumber="+918733936309"
                companyName="bitezy Support"
            />
        </div>
    );
};

export default ChatWidget;
