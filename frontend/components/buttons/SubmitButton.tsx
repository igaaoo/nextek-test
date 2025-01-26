import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({ loading, title, formId }: { loading: boolean; title?: string; formId?: string; }) {
  return (
    <Button
      form={formId}
      type="submit"
      disabled={loading}
      className={
        cn("w-40",
          title == 'Aprovar' && 'bg-emerald-500',
        )}

    >{loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" />Aguarde...</div> : <div className="flex items-center gap-2">{title ? title : 'Enviar'}</div>}</Button>
  );
}