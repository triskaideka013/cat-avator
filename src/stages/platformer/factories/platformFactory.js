class PlatformFactory {
  static createPlatforms(platformList) {
    return platformList.map(platform => {
      return new Platform(2, vec2(platform.x, platform.y), vec2(platform.width, platform.height), new Color(1, 0, 0));
    });
  }
}
