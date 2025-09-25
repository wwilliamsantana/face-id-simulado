import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  ScanFace,
  Monitor,
  Smartphone,
  Wifi,
} from "lucide-react";
import { FaceIdScanner } from "@/components/FaceIdScanner";
import { AttendanceStats } from "@/components/AttendanceStats";
import { RealtimeDashboard } from "@/components/RealtimeDashboard";
import { AttendanceReports } from "@/components/AttendanceReports";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeStudents, setActiveStudents] = useState(24);
  const [totalStudents] = useState(32);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const attendanceRate = Math.round((activeStudents / totalStudents) * 100);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="border-b bg-gradient-to-br from-[#2F519E] to-[#4F59B4] border-white/10  backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">

              {/* <ScanFace className="w-6 h-6 text-white/80" /> */}
              <img src="./favicon.ico" alt="" className="rounded-xl" />

              <div>
                <h1 className="text-xl font-bold text-white/80">
                  FaceClassroom
                </h1>
                <p className="text-sm text-white/80">
                  Controle de Presença Inteligente
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white/80">
                  {currentTime.toLocaleTimeString("pt-BR")}
                </p>
                <p className="text-xs text-white/80">
                  {currentTime.toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-white/20 text-white/80"
              >
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 bg-gradient-hero">
        <Tabs defaultValue="scanner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 border-black/20">
            <TabsTrigger
              value="scanner"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-violet-500/40 data-[state=active]:text-primary "
            >
              <Camera className="w-4 h-4 mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-violet-500/40 data-[state=active]:text-primary"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-violet-500/40 data-[state=active]:text-primary"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-violet-500/40 data-[state=active]:text-primary"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-white/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-black/80" />
                  <div>
                    <p className="text-sm font-medium text-black/80/90">
                      Presentes
                    </p>
                    <p className="text-2xl font-bold text-black/80">
                      {activeStudents}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-black/80" />
                  <div>
                    <p className="text-sm font-medium text-black/80/90">
                      Taxa de Presença
                    </p>
                    <p className="text-2xl font-bold text-black/80">
                      {attendanceRate}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium text-black/80/90">
                      Aula Ativa
                    </p>
                    <p className="text-lg font-bold text-success">
                      Sistema Web
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-black/80" />
                  <div>
                    <p className="text-sm font-medium text-black/80/90">
                      Carga Horária
                    </p>
                    <div className="flex items-center space-x-2">
                      <Progress value={75} className="w-16 h-2" />
                      <span className="text-sm font-medium text-black/80">
                        75%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Contents */}
          <TabsContent value="scanner" className="space-y-6">
            <FaceIdScanner onStudentDetected={setActiveStudents} />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <RealtimeDashboard
              activeStudents={activeStudents}
              totalStudents={totalStudents}
            />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <AttendanceStats />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <AttendanceReports />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
