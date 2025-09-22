import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Users,
  BarChart3,
  Clock,
  Mail,
  Share2
} from "lucide-react";
import { toast } from "sonner";

export const AttendanceReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedClass, setSelectedClass] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: "attendance_summary",
      title: "Relatório de Frequência",
      description: "Resumo geral de presença por período",
      icon: Users,
      format: ["PDF", "Excel"],
      data: "Inclui estatísticas gerais, gráficos e listas de presença"
    },
    {
      id: "individual_report",
      title: "Relatório Individual",
      description: "Detalhamento por aluno específico",
      icon: FileText,
      format: ["PDF"],
      data: "Histórico completo, faltas, percentual de frequência"
    },
    {
      id: "class_analytics",
      title: "Analytics da Turma",
      description: "Análise comportamental e tendências",
      icon: BarChart3,
      format: ["PDF", "Excel"],
      data: "Padrões de presença, horários críticos, correlações"
    },
    {
      id: "weekly_summary",
      title: "Resumo Semanal",
      description: "Consolidado da semana atual",
      icon: Clock,
      format: ["PDF", "Email"],
      data: "Envio automático todo domingo para coordenação"
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: "Frequência Setembro 2024",
      type: "Mensal",
      generated: "2024-09-20",
      size: "2.4 MB",
      status: "Concluído"
    },
    {
      id: 2,
      title: "Analytics Turma 1TDSPB",
      type: "Analytics",
      generated: "2024-09-19",
      size: "1.8 MB",
      status: "Concluído"
    },
    {
      id: 3,
      title: "Relatório Individual - Ana Silva",
      type: "Individual",
      generated: "2024-09-18",
      size: "856 KB",
      status: "Concluído"
    }
  ];

  const handleGenerateReport = async (reportType: string, format: string) => {
    setIsGenerating(true);

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsGenerating(false);
    toast.success(`Relatório gerado com sucesso!`, {
      description: `Arquivo ${format} pronto para download`,
      duration: 4000,
    });
  };

  const handleDownloadReport = (reportId: number) => {
    toast.success("Download iniciado", {
      description: "O arquivo será salvo na pasta Downloads",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Report Filters */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <Filter className="w-5 h-5" />
            <span>Filtros de Relatório</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Configure os parâmetros para geração de relatórios personalizados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period" className="text-black/80">Período</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-zinc-200 border-white/20 text-black/80">
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mês</SelectItem>
                  <SelectItem value="semester">Este Semestre</SelectItem>
                  <SelectItem value="year">Este Ano</SelectItem>
                  <SelectItem value="custom">Período Customizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class" className="text-black/80">Turma</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="bg-zinc-200 border-white/20 text-black/80">
                  <SelectValue placeholder="Selecionar turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Turmas</SelectItem>
                  <SelectItem value="1tdspb">1TDSPB - Desenvolvimento Web</SelectItem>
                  <SelectItem value="2tdspb">2TDSPB - Sistemas Mobile</SelectItem>
                  <SelectItem value="3tdspb">3TDSPB - DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range" className="text-black/80">Data Específica</Label>
              <Input
                type="date"
                className="bg-zinc-200 border-white/20 text-black/80"
                placeholder="Data inicial"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id} className="bg-zinc-200 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-black/80">
                <report.icon className="w-5 h-5" />
                <span>{report.title}</span>
              </CardTitle>
              <CardDescription className="text-black/80/70">
                {report.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-black/80/80">{report.data}</p>

              <div className="flex flex-wrap gap-2">
                {report.format.map((format) => (
                  <Badge key={format} variant="outline" className="border-white/20 text-black/80">
                    {format}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                {report.format.map((format) => (
                  <Button
                    key={format}
                    onClick={() => handleGenerateReport(report.id, format)}
                    disabled={isGenerating}
                    variant="outline"
                    size="sm"
                    className="bg-zinc-200 border-white/20 text-black/80 hover:bg-white/20"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3 mr-2" />
                        {format}
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <FileText className="w-5 h-5" />
            <span>Relatórios Recentes</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Histórico dos últimos relatórios gerados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-black/80/70" />
                  <div>
                    <p className="font-medium text-black/80">{report.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-black/80/70">
                      <span>{report.type}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(report.generated).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-success text-success">
                    {report.status}
                  </Badge>
                  <Button
                    onClick={() => handleDownloadReport(report.id)}
                    variant="outline"
                    size="sm"
                    className="bg-zinc-200 border-white/20 text-black/80 hover:bg-white/20"
                  >
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-200 border-white/20 text-black/80 hover:bg-white/20"
                  >
                    <Share2 className="w-3 h-3 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {recentReports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-black/80/30 mx-auto mb-4" />
              <p className="text-black/80/70">Nenhum relatório encontrado</p>
              <p className="text-sm text-black/80/50">Gere seu primeiro relatório usando as opções acima</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automated Reports */}
      <Card className="bg-zinc-200 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-black/80">
            <Mail className="w-5 h-5" />
            <span>Relatórios Automáticos</span>
          </CardTitle>
          <CardDescription className="text-black/80/70">
            Configure envios automáticos para coordenação e gestão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-black/80">Relatório Semanal</p>
                  <p className="text-sm text-black/80/70">Toda segunda às 08:00</p>
                </div>
                <Badge variant="outline" className="border-success text-success">
                  Ativo
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-black/80">Relatório Mensal</p>
                  <p className="text-sm text-black/80/70">Todo dia 1º às 09:00</p>
                </div>
                <Badge variant="outline" className="border-success text-success">
                  Ativo
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-black/80">Alertas de Frequência</p>
                  <p className="text-sm text-black/80/70">Quando menor que 75%</p>
                </div>
                <Badge variant="outline" className="border-warning text-warning">
                  Pausado
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <div>
                  <p className="font-medium text-black/80">Relatório Semestral</p>
                  <p className="text-sm text-black/80/70">A cada 6 meses</p>
                </div>
                <Badge variant="outline" className="border-success text-success">
                  Ativo
                </Badge>
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-primary hover:shadow-glow">
            <Mail className="w-4 h-4 mr-2" />
            Configurar Envios Automáticos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};