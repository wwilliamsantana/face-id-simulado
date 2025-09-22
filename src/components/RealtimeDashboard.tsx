import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Calendar,
  MapPin,
  Wifi,
  Monitor,
  Smartphone
} from "lucide-react";

interface RealtimeDashboardProps {
  activeStudents: number;
  totalStudents: number;
}

export const RealtimeDashboard = ({ activeStudents, totalStudents }: RealtimeDashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [classProgress, setClassProgress] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate class progress
      const minutes = currentTime.getMinutes();
      const progress = Math.min((minutes / 90) * 100, 100); // 90 min class
      setClassProgress(progress);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime]);

  const attendanceRate = Math.round((activeStudents / totalStudents) * 100);
  const classStatus = classProgress < 30 ? "Início" : classProgress < 70 ? "Em Andamento" : "Final";

  const mockClassInfo = {
    subject: "Desenvolvimento Web Avançado",
    professor: "Prof. Dr. João Silva",
    room: "Lab 204 - Bloco A",
    duration: "08:00 - 09:30",
    modalidade: "Presencial"
  };

  const modalityStats = [
    { type: "Presencial", count: 18, color: "bg-primary" },
    { type: "Híbrido", count: 6, color: "bg-accent" },
    { type: "EAD", count: 0, color: "bg-muted" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Class Information */}
      <Card className="lg:col-span-2 bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Monitor className="w-5 h-5" />
            <span>Informações da Aula</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Acompanhamento em tempo real da aula atual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/70">Disciplina</p>
              <p className="text-lg font-semibold text-white">{mockClassInfo.subject}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/70">Professor</p>
              <p className="text-lg font-semibold text-white">{mockClassInfo.professor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/70">Local</p>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-white/70" />
                <p className="text-lg font-semibold text-white">{mockClassInfo.room}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/70">Horário</p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-white/70" />
                <p className="text-lg font-semibold text-white">{mockClassInfo.duration}</p>
              </div>
            </div>
          </div>

          {/* Class Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">Progresso da Aula</p>
              <Badge variant="outline" className="border-white/20 text-white">
                {classStatus}
              </Badge>
            </div>
            <Progress value={classProgress} className="h-3" />
            <p className="text-sm text-white/70">{Math.round(classProgress)}% concluído</p>
          </div>

          {/* Attendance Summary */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{activeStudents}</p>
              <p className="text-sm text-white/70">Presentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalStudents - activeStudents}</p>
              <p className="text-sm text-white/70">Ausentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{attendanceRate}%</p>
              <p className="text-sm text-white/70">Taxa de Presença</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Stats */}
      <div className="space-y-6">
        {/* Current Time */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {currentTime.toLocaleTimeString('pt-BR')}
            </p>
            <p className="text-sm text-white/70">
              {currentTime.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </CardContent>
        </Card>

        {/* Attendance Rate */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-white text-lg">
              <TrendingUp className="w-5 h-5" />
              <span>Taxa de Presença</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{attendanceRate}%</p>
              <Progress value={attendanceRate} className="mt-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Meta da turma:</span>
                <span className="text-white font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Status:</span>
                <Badge variant={attendanceRate >= 85 ? "default" : "destructive"}>
                  {attendanceRate >= 85 ? "Atingida" : "Abaixo da meta"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modality Distribution */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-white text-lg">
              <Wifi className="w-5 h-5" />
              <span>Modalidades</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {modalityStats.map((stat) => (
              <div key={stat.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                  <span className="text-sm text-white/70">{stat.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{stat.count}</span>
                  {stat.type === "Presencial" && <Users className="w-4 h-4 text-white/50" />}
                  {stat.type === "Híbrido" && <Monitor className="w-4 h-4 text-white/50" />}
                  {stat.type === "EAD" && <Smartphone className="w-4 h-4 text-white/50" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};