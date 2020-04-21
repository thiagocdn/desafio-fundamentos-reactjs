import React, { useState } from 'react';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    uploadedFiles.map((file) => {
      data.append('file', file.file);
      return true;
    });
    try {
      const files = data.getAll('file');
      for (const file of files) {
        const importFile = new FormData();
        importFile.append('file', file);
        await api.post('/transactions/import', importFile);
        importFile.delete('file');
      }
      setUploadedFiles([]);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const newFiles: FileProps[] = files.map((file) => {
      const newFile = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };

      return newFile;
    });
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
