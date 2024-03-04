package tools

import (
	"errors"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
)

var extensions = [4]string{"png", "jpg", "jpeg", "gif"}

func GetFile(w http.ResponseWriter, r *http.Request, header *multipart.FileHeader, file multipart.File) error {

	err := CheckExtension(header.Filename)

	if err != nil {
		return err
	}

	newFile, err := os.Create("./files/" + header.Filename)

	if err != nil {
		return err
	}
	defer newFile.Close()

	_, err = io.Copy(newFile, file)

	if err != nil {
		return err
	}

	return nil
}

func CheckExtension(fileName string) error {
	if len(fileName) < 5 {
		return errors.New("innacceptable file")
	}

	split := strings.Split(fileName, ".")

	for _, ext := range extensions {
		if ext == split[1] {
			return nil
		}
	}

	return errors.New("innacceptable file")
}
