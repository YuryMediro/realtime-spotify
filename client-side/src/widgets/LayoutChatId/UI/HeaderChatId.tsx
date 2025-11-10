import { ChatHeader } from "@/components/Chat/ui/ChatHeader";
import { MainHeader } from "@/widgets/Layout/UI/MainHeader/MainHeader";

export const HeaderChatId = () => {
  return (
    <header className="sticky top-0 z-50 flex flex-col" >
      <MainHeader/>
      <div className='lg:hidden block'>
        <ChatHeader />
        </div>
    </header>
  );
};
