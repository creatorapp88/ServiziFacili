import React from 'react';
import { X, Download, FileText, Calendar, Euro, Building, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/pricing';

interface InvoiceData {
  id: string;
  date: string;
  amount: number;
  description: string;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData;
  companyInfo: {
    name: string;
    address: string;
    vatNumber: string;
    fiscalCode: string;
  };
  customerInfo: {
    name: string;
    email: string;
    vatNumber?: string;
  };
}

export default function InvoiceModal({ 
  isOpen, 
  onClose, 
  invoice, 
  companyInfo, 
  customerInfo 
}: InvoiceModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // In produzione, questo genererebbe un PDF reale
    alert('Download fattura in sviluppo - sarà disponibile nella versione finale');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Fattura #{invoice.id}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Scarica PDF</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Company Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{companyInfo.name}</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>{companyInfo.address}</p>
                <p>P.IVA: {companyInfo.vatNumber}</p>
                <p>C.F.: {companyInfo.fiscalCode}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Data fattura</p>
                <p className="font-semibold">{new Date(invoice.date).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-3">Fatturato a:</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium">{customerInfo.name}</p>
              <p className="text-gray-600">{customerInfo.email}</p>
              {customerInfo.vatNumber && (
                <p className="text-gray-600">P.IVA: {customerInfo.vatNumber}</p>
              )}
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600 font-medium">Descrizione</th>
                  <th className="text-right py-3 text-gray-600 font-medium">Importo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.description}</p>
                      <p className="text-sm text-gray-500">Ricarica wallet professionista</p>
                    </div>
                  </td>
                  <td className="py-4 text-right font-medium">
                    {formatCurrency(invoice.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotale:</span>
                <span className="font-medium">{formatCurrency(invoice.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IVA ({invoice.vatRate}%):</span>
                <span className="font-medium">{formatCurrency(invoice.vatAmount)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Totale:</span>
                <span className="text-blue-600">{formatCurrency(invoice.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-8 bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <div>
                <p className="font-medium text-sm">Pagamento completato</p>
                <p className="text-xs">Transazione elaborata il {new Date(invoice.date).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
          </div>

          {/* Legal Notes */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>Fattura emessa elettronicamente ai sensi del D.Lgs. 127/2015</p>
            <p>Regime fiscale: Regime ordinario</p>
            <p>Modalità di pagamento: Carta di credito/debito</p>
          </div>
        </div>
      </div>
    </div>
  );
}