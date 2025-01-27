import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Plus } from "lucide-react";

interface Task {
  id: number;
  estado: string;
  created_at: string;
}

interface Comment {
  id: number;
  task_id: number;
  contenido: string;
  created_at: string;
}

interface KanbanBoardProps {
  session: any;
}

const KanbanBoard = ({ session }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const { toast } = useToast();

  const columns = [
    { id: "Por hacer", title: "Por hacer" },
    { id: "En curso", title: "En curso" },
    { id: "QA", title: "QA" },
    { id: "Listo", title: "Listo" },
  ];

  useEffect(() => {
    if (session) {
      fetchTasks();
      fetchComments();
      subscribeToChanges();
    }
  }, [session]);

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Task' },
        (payload) => {
          console.log('Cambio en tareas:', payload);
          fetchTasks();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Comment' },
        (payload) => {
          console.log('Cambio en comentarios:', payload);
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("Task").select("*");
    if (error) {
      toast({
        variant: "destructive",
        title: "Error al cargar tareas",
        description: error.message,
      });
      return;
    }
    setTasks(data || []);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase.from("Comment").select("*");
    if (error) {
      toast({
        variant: "destructive",
        title: "Error al cargar comentarios",
        description: error.message,
      });
      return;
    }
    setComments(data || []);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    const taskId = parseInt(draggableId);
    const { error } = await supabase
      .from("Task")
      .update({ estado: destination.droppableId })
      .eq("id", taskId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error al actualizar tarea",
        description: error.message,
      });
      return;
    }

    await fetchTasks();
  };

  const addTask = async (estado: string) => {
    const { error } = await supabase.from("Task").insert([{ 
      estado,
      user_id: session.user.id 
    }]);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error al crear tarea",
        description: error.message,
      });
      return;
    }
    await fetchTasks();
  };

  const addComment = async () => {
    if (!selectedTask || !newComment.trim()) return;

    const { error } = await supabase
      .from("Comment")
      .insert([{ task_id: selectedTask, contenido: newComment }]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error al agregar comentario",
        description: error.message,
      });
      return;
    }

    setNewComment("");
    await fetchComments();
  };

  return (
    <div className="p-4 min-h-screen bg-[#f8f9fa]">
      <h1 className="text-4xl font-bold mb-8 text-center font-comic">Tablero Kanban blako</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-gray-300">
              <h2 className="text-xl font-bold mb-4 font-comic">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px]"
                  >
                    {tasks
                      .filter((task) => task.estado === column.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-2 border-gray-200"
                            >
                              <CardHeader>
                                <CardTitle className="text-lg font-comic">
                                  Tarea #{task.id}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {comments
                                    .filter((comment) => comment.task_id === task.id)
                                    .map((comment) => (
                                      <div
                                        key={comment.id}
                                        className="bg-gray-50 p-2 rounded-md"
                                      >
                                        <p className="text-sm font-comic">{comment.contenido}</p>
                                      </div>
                                    ))}
                                  {selectedTask === task.id && (
                                    <div className="space-y-2">
                                      <Textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Agregar comentario..."
                                        className="w-full"
                                      />
                                      <Button
                                        onClick={addComment}
                                        size="sm"
                                        className="w-full"
                                      >
                                        Agregar Comentario
                                      </Button>
                                    </div>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setSelectedTask(
                                        selectedTask === task.id ? null : task.id
                                      )
                                    }
                                    className="w-full"
                                  >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    {selectedTask === task.id
                                      ? "Cerrar"
                                      : "Comentarios"}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                    <Button
                      onClick={() => addTask(column.id)}
                      variant="outline"
                      className="w-full mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Tarea
                    </Button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;