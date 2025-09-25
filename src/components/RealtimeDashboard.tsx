import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Smartphone,
} from "lucide-react";

interface RealtimeDashboardProps {
  activeStudents: number;
  totalStudents: number;
}

export const RealtimeDashboard = ({
  activeStudents,
  totalStudents,
}: RealtimeDashboardProps) => {
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
  const classStatus =
    classProgress < 30
      ? "Início"
      : classProgress < 70
        ? "Em Andamento"
        : "Final";

  const mockClassInfo = {
    subject: "Desenvolvimento Web Avançado",
    professor: "Prof. Dr. João Silva",
    room: "Lab 204 - Bloco A",
    duration: "08:00 - 09:30",
    modalidade: "Presencial",
  };

  const modalityStats = [
    { type: "Presencial", count: 18, color: "bg-primary" },
    { type: "Híbrido", count: 6, color: "bg-accent" },
    { type: "EAD", count: 0, color: "bg-muted" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Class Information */}
      <Card className="lg:col-span-2 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <Monitor className="w-5 h-5" />
            <span>Informações da Aula</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Acompanhamento em tempo real da aula atual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-black/80/70">Disciplina</p>
              <p className="text-lg font-semibold text-black/80">
                {mockClassInfo.subject}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-black/80/70">Professor</p>
              <p className="text-lg font-semibold text-black/80">
                {mockClassInfo.professor}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-black/80/70">Local</p>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-black/80/70" />
                <p className="text-lg font-semibold text-black/80">
                  {mockClassInfo.room}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-black/80/70">Horário</p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-black/80/70" />
                <p className="text-lg font-semibold text-black/80">
                  {mockClassInfo.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Class Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-black/80/70">
                Progresso da Aula
              </p>
              <Badge
                variant="outline"
                className="border-white/20 text-black/80"
              >
                {classStatus}
              </Badge>
            </div>
            <Progress value={classProgress} className="h-3" />
            <p className="text-sm text-black/80/70">
              {Math.round(classProgress)}% concluído
            </p>
          </div>

          {/* Attendance Summary */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-black/80">
                {activeStudents}
              </p>
              <p className="text-sm text-black/80/70">Presentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-black/80">
                {totalStudents - activeStudents}
              </p>
              <p className="text-sm text-black/80/70">Ausentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-black/80">
                {attendanceRate}%
              </p>
              <p className="text-sm text-black/80/70">Taxa de Presença</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Stats */}
      <div className="space-y-6">
        {/* Current Time */}
        <Card className="border-white/20 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-black/80 mx-auto mb-2" />
            <p className="text-2xl font-bold text-black/80">
              {currentTime.toLocaleTimeString("pt-BR")}
            </p>
            <p className="text-sm text-black/80/70">
              {currentTime.toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        {/* Attendance Rate */}
        <Card className="border-white/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-black/80 text-lg">
              <TrendingUp className="w-5 h-5" />
              <span>Taxa de Presença</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-black/80">
                {attendanceRate}%
              </p>
              <Progress value={attendanceRate} className="mt-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-black/80/70">Meta da turma:</span>
                <span className="text-black/80 font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/80/70">Status:</span>
                <Badge
                  variant={attendanceRate >= 85 ? "default" : "destructive"}
                >
                  {attendanceRate >= 85 ? "Atingida" : "Abaixo da meta"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modality Distribution */}
        <Card className="border-white/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-black/80 text-lg">
              <Wifi className="w-5 h-5" />
              <span>Modalidades</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {modalityStats.map((stat) => (
              <div
                key={stat.type}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                  <span className="text-sm text-black/80/70">{stat.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-black/80">
                    {stat.count}
                  </span>
                  {stat.type === "Presencial" && (
                    <Users className="w-4 h-4 text-black/80/50" />
                  )}
                  {stat.type === "Híbrido" && (
                    <Monitor className="w-4 h-4 text-black/80/50" />
                  )}
                  {stat.type === "EAD" && (
                    <Smartphone className="w-4 h-4 text-black/80/50" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

