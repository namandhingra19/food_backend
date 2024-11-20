class MediaLibraryController {
  public async create(file: File): Promise<any> {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error Creating Media Library" });
    }
  }
}
