export const cloudinaryService = {
    async uploadImage(file: File): Promise<string> {
        const CLOUD_NAME = 'l7n5c7ue';
        const UPLOAD_PRESET = 'compia_perfil';

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                { method: 'POST', body: formData }
            );

            if (!response.ok) throw new Error('Falha ao enviar a imagem.');

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Erro no upload:', error);
            throw new Error('Não foi possível processar a imagem no momento.', { cause: error });
        }
    }
};