import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const DeletionHistory = () => {
  const { data: deletionHistory, isLoading } = useQuery({
    queryKey: ["deletionHistory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("DeletionHistory")
        .select(`
          *,
          deleted_by_user:deleted_by(email)
        `)
        .order("deleted_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Cargando historial...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Historial de Eliminaciones</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Eliminado por</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Datos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deletionHistory?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.entity_type}</TableCell>
              <TableCell>{item.entity_id}</TableCell>
              <TableCell>{item.deleted_by_user?.email}</TableCell>
              <TableCell>
                {format(new Date(item.deleted_at), "PPpp", { locale: es })}
              </TableCell>
              <TableCell className="max-w-md truncate">
                {JSON.stringify(item.entity_data)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeletionHistory;