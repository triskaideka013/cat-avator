class PlatformFactory {
  static createPlatforms(platformList) {
    const platforms = [];
    platformList.forEach(platform => {
      platforms.push(new Platform(2, vec2(platform.x, platform.y), vec2(platform.width, platform.height), new Color(1, 0, 0)));
    });
    return platforms;
  }
}
