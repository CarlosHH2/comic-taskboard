export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Comment: {
        Row: {
          contenido: string
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: number
          task_id: number | null
        }
        Insert: {
          contenido: string
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: number
          task_id?: number | null
        }
        Update: {
          contenido?: string
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: number
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Comment_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "Task"
            referencedColumns: ["id"]
          },
        ]
      }
      conceptos: {
        Row: {
          created_at: string | null
          descripcion: string
          id: number
          nombre: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descripcion: string
          id?: number
          nombre: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descripcion?: string
          id?: number
          nombre?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cotizaciones: {
        Row: {
          concepto_id: number | null
          created_at: string | null
          estatus: string | null
          frecuencia_pago: string
          id: number
          monto: number
          nombre: string
          prospecto_id: number | null
          updated_at: string | null
        }
        Insert: {
          concepto_id?: number | null
          created_at?: string | null
          estatus?: string | null
          frecuencia_pago: string
          id?: number
          monto: number
          nombre: string
          prospecto_id?: number | null
          updated_at?: string | null
        }
        Update: {
          concepto_id?: number | null
          created_at?: string | null
          estatus?: string | null
          frecuencia_pago?: string
          id?: number
          monto?: number
          nombre?: string
          prospecto_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cotizaciones_concepto_id_fkey"
            columns: ["concepto_id"]
            isOneToOne: false
            referencedRelation: "conceptos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cotizaciones_prospecto_id_fkey"
            columns: ["prospecto_id"]
            isOneToOne: false
            referencedRelation: "prospectos"
            referencedColumns: ["id"]
          },
        ]
      }
      DeletionHistory: {
        Row: {
          deleted_at: string | null
          deleted_by: string
          entity_data: Json
          entity_id: number
          entity_type: string
          id: number
        }
        Insert: {
          deleted_at?: string | null
          deleted_by: string
          entity_data: Json
          entity_id: number
          entity_type: string
          id?: number
        }
        Update: {
          deleted_at?: string | null
          deleted_by?: string
          entity_data?: Json
          entity_id?: number
          entity_type?: string
          id?: number
        }
        Relationships: []
      }
      evidencias_pago: {
        Row: {
          archivo_url: string
          cotizacion_id: number | null
          created_at: string | null
          id: number
          monto: number
        }
        Insert: {
          archivo_url: string
          cotizacion_id?: number | null
          created_at?: string | null
          id?: number
          monto: number
        }
        Update: {
          archivo_url?: string
          cotizacion_id?: number | null
          created_at?: string | null
          id?: number
          monto?: number
        }
        Relationships: [
          {
            foreignKeyName: "evidencias_pago_cotizacion_id_fkey"
            columns: ["cotizacion_id"]
            isOneToOne: false
            referencedRelation: "cotizaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          nombre: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          nombre?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nombre?: string | null
        }
        Relationships: []
      }
      prospectos: {
        Row: {
          apellido_materno: string
          apellido_paterno: string
          created_at: string | null
          email: string
          estatus: Database["public"]["Enums"]["prospecto_status"] | null
          fuente: Database["public"]["Enums"]["prospecto_source"]
          id: number
          nombre: string
          telefono1: string
          telefono2: string | null
          updated_at: string | null
        }
        Insert: {
          apellido_materno: string
          apellido_paterno: string
          created_at?: string | null
          email: string
          estatus?: Database["public"]["Enums"]["prospecto_status"] | null
          fuente: Database["public"]["Enums"]["prospecto_source"]
          id?: number
          nombre: string
          telefono1: string
          telefono2?: string | null
          updated_at?: string | null
        }
        Update: {
          apellido_materno?: string
          apellido_paterno?: string
          created_at?: string | null
          email?: string
          estatus?: Database["public"]["Enums"]["prospecto_status"] | null
          fuente?: Database["public"]["Enums"]["prospecto_source"]
          id?: number
          nombre?: string
          telefono1?: string
          telefono2?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      Task: {
        Row: {
          assigned_to: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          descripcion: string | null
          estado: string | null
          fecha_vencimiento: string | null
          id: number
          titulo: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          descripcion?: string | null
          estado?: string | null
          fecha_vencimiento?: string | null
          id?: number
          titulo?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          descripcion?: string | null
          estado?: string | null
          fecha_vencimiento?: string | null
          id?: number
          titulo?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      was_created_by_me: {
        Args: {
          check_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      prospecto_source: "web" | "recomendacion"
      prospecto_status:
        | "Nuevo"
        | "Sí contestó"
        | "Agendado"
        | "Cita realizada"
        | "2da cita realizada"
        | "Cliente (emisión)"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
