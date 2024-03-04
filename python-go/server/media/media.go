package media

import (
	"net/http"

	"github.com/farm-er/pyhon-go/database/datafiles"
	"github.com/farm-er/pyhon-go/tools"
)

func UploadFile(w http.ResponseWriter, r *http.Request) (string, error) {

	r.ParseMultipartForm(10)

	reqFile, header, err := r.FormFile("file")
	if err != nil {
		return "Error getting file", err
	}

	defer reqFile.Close()

	// get and upload file
	err = tools.GetFile(w, r, header, reqFile)

	if err != nil {
		return "Error getting file from request", err
	}

	// store a file reference in database
	var file datafiles.File

	file.FileName = header.Filename

	err = file.AddFile()

	if err != nil {
		return "Error storing file", err
	}

	tools.WriteJSON(w, http.StatusOK, tools.ServerError{
		Error:          "File uploaded",
		AdditionalData: "",
	})

	return "", nil
}
