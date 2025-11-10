import { MessageInput } from "@/components/Chat/ui/MessageInput";
import { AudioFooter } from "@/widgets/Layout/UI/AudioFooter/AudioFooter";

export const FooterChatId = () => {
  return (
    <footer>
      <div>
        <div className="lg:hidden block">
          <MessageInput />
        </div>
        <AudioFooter />
      </div>
    </footer>
  );
};
