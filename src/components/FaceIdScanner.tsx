import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  ScanFace, 
  CheckCircle, 
  AlertCircle,
  User,
  Clock,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  status: "presente" | "ausente";
  scanTime?: string;
  avatar: string;
}

interface FaceIdScannerProps {
  onStudentDetected: (count: number) => void;
}

export const FaceIdScanner = ({ onStudentDetected }: FaceIdScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: "001", name: "Ana Silva", status: "presente", scanTime: "08:15", avatar: "🧑‍🎓" },
    { id: "002", name: "Bruno Costa", status: "presente", scanTime: "08:12", avatar: "👨‍🎓" },
    { id: "003", name: "Carla Souza", status: "presente", scanTime: "08:18", avatar: "👩‍🎓" },
    { id: "004", name: "Diego Lima", status: "ausente", avatar: "🧑‍🎓" },
    { id: "005", name: "Elena Santos", status: "presente", scanTime: "08:20", avatar: "👩‍🎓" },
  ]);

  const mockStudents = [
    "João Pedro", "Maria Clara", "Lucas Almeida", "Fernanda Cruz", 
    "Rafael Moreira", "Camila Nunes", "Thiago Barbosa", "Juliana Melo",
    "Gabriel Torres", "Beatriz Rocha", "Mateus Cunha", "Larissa Dias"
  ];

  const simulateFaceScan = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
      const currentTime = new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const newStudent: Student = {
        id: Math.random().toString(36).substr(2, 9),
        name: randomStudent,
        status: "presente",
        scanTime: currentTime,
        avatar: ["🧑‍🎓", "👨‍🎓", "👩‍🎓"][Math.floor(Math.random() * 3)]
      };

      setScanResult(newStudent);
      setIsScanning(false);

      // Update students list
      setStudents(prev => {
        const exists = prev.find(s => s.name === newStudent.name);
        if (!exists) {
          const updated = [newStudent, ...prev];
          onStudentDetected(updated.filter(s => s.status === "presente").length);
          return updated;
        }
        return prev;
      });

      toast.success(`Presença registrada: ${randomStudent}`, {
        description: `Registrado às ${currentTime}`,
        duration: 3000,
      });
    }, 2500);
  };

  const presentStudents = students.filter(s => s.status === "presente");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Scanner Interface */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <ScanFace className="w-5 h-5" />
            <span>Scanner ControlD (Face ID)</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Posicione-se em frente ao dispositivo para registro automático
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scanner Display */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden">
              {isScanning ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <p className="text-white font-medium">Escaneando rosto...</p>
                    <div className="flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              ) : scanResult ? (
                <div className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl">{scanResult.avatar}</p>
                    <p className="text-white font-medium">{scanResult.name}</p>
                    <Badge variant="outline" className="border-success text-success">
                      Presença Confirmada
                    </Badge>
                    <p className="text-sm text-white/70">Registrado às {scanResult.scanTime}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 text-white/50 mx-auto" />
                  <p className="text-white/70">Aguardando reconhecimento facial</p>
                </div>
              )}
            </div>
            
            {/* Scanner Overlay */}
            {isScanning && (
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse"></div>
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary"></div>
              </div>
            )}
          </div>

          <Button 
            onClick={simulateFaceScan}
            disabled={isScanning}
            className="w-full bg-gradient-primary hover:shadow-glow"
            size="lg"
          >
            {isScanning ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <ScanFace className="w-4 h-4 mr-2" />
                Iniciar Reconhecimento
              </>
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-white/70">
              Dispositivo ControlD conectado via USB
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success">Status: Online</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <User className="w-5 h-5" />
            <span>Presenças Registradas</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            Lista em tempo real dos alunos presentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {presentStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{student.avatar}</span>
                  <div>
                    <p className="font-medium text-white">{student.name}</p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-white/50" />
                      <span className="text-xs text-white/70">{student.scanTime}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="border-success text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Presente
                </Badge>
              </div>
            ))}
            
            {presentStudents.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-white/50 mx-auto mb-2" />
                <p className="text-white/70">Nenhuma presença registrada ainda</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};