import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Clock,
  Target,
  Award
} from "lucide-react";

export const AttendanceStats = () => {
  const weeklyStats = [
    { day: "Seg", attendance: 85, total: 32 },
    { day: "Ter", attendance: 78, total: 32 },
    { day: "Qua", attendance: 91, total: 32 },
    { day: "Qui", attendance: 75, total: 32 },
    { day: "Sex", attendance: 88, total: 32 },
  ];

  const studentStats = [
    { name: "Ana Silva", attendance: 95, classes: 20, status: "excellent" },
    { name: "Bruno Costa", attendance: 85, classes: 20, status: "good" },
    { name: "Carla Souza", attendance: 70, classes: 20, status: "warning" },
    { name: "Diego Lima", attendance: 45, classes: 20, status: "critical" },
    { name: "Elena Santos", attendance: 90, classes: 20, status: "excellent" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent": return "Excelente";
      case "good": return "Bom";
      case "warning": return "Atenção";
      case "critical": return "Crítico";
      default: return "Regular";
    }
  };

  const averageAttendance = Math.round(
    weeklyStats.reduce((acc, day) => acc + day.attendance, 0) / weeklyStats.length
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Overview */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <BarChart3 className="w-5 h-5" />
            <span>Presença Semanal</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Comparativo dos últimos 5 dias úteis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black/80">{day.day}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-black/80/70">{day.attendance}%</span>
                    <span className="text-xs text-black/80/50">
                      ({Math.round((day.attendance / 100) * day.total)}/{day.total})
                    </span>
                  </div>
                </div>
                <Progress value={day.attendance} className="h-2" />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black/80/70">Média Semanal</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-lg font-bold text-black/80">{averageAttendance}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xl font-bold text-black/80">156</p>
                <p className="text-xs text-black/80/70">Total de Presenças</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-black/80">160</p>
                <p className="text-xs text-black/80/70">Total de Aulas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance by Student */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <Users className="w-5 h-5" />
            <span>Performance Individual</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Ranking de frequência dos alunos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentStats.map((student, index) => (
              <div key={student.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-black/80 font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-black/80">{student.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={`border-white/20 ${getStatusColor(student.status)}`}
                    >
                      {getStatusBadge(student.status)}
                    </Badge>
                    <span className="text-sm font-medium text-black/80">{student.attendance}%</span>
                  </div>
                </div>
                <Progress value={student.attendance} className="h-2" />
                <div className="flex justify-between text-xs text-black/80/50">
                  <span>{Math.round((student.attendance / 100) * student.classes)} aulas presentes</span>
                  <span>{student.classes} aulas totais</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <Calendar className="w-5 h-5" />
            <span>Resumo Mensal</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Setembro 2024 - Estatísticas consolidadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-black/80" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black/80">87%</p>
                <p className="text-sm text-black/80/70">Frequência Geral</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black/80">68h</p>
                <p className="text-sm text-black/80/70">Carga Horária</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/80/70">Aulas Realizadas</span>
              <span className="text-sm font-medium text-black/80">20/24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/80/70">Taxa de Pontualidade</span>
              <span className="text-sm font-medium text-black/80">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/80/70">Melhor Dia</span>
              <span className="text-sm font-medium text-black/80">Quarta-feira</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/80/70">Pior Dia</span>
              <span className="text-sm font-medium text-black/80">Segunda-feira</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <Award className="w-5 h-5" />
            <span>Conquistas</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Marcos e objetivos atingidos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-black/80" />
              </div>
              <div>
                <p className="font-medium text-black/80">Meta Semestral</p>
                <p className="text-sm text-black/80/70">85% de frequência atingida</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black/80" />
              </div>
              <div>
                <p className="font-medium text-black/80">Melhoria Contínua</p>
                <p className="text-sm text-black/80/70">3 semanas consecutivas acima da média</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-black/80">Participação</p>
                <p className="text-sm text-black/80/70">100% dos alunos com pelo menos 1 presença</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};