class PlatformFactory {
  static createPlatforms() {
    const platforms = [];
    platforms.push(new Platform(vec2(-30, 3), vec2(10, 1), new Color(1, 1, 0)));
    platforms.push(new Platform(vec2(10, 3), vec2(10, 1), new Color(1, 0, 0)));
    platforms.push(new Platform(vec2(20, 8), vec2(10, 1), new Color(0, 1, 0)));
    platforms.push(new Platform(vec2(30, 14), vec2(10, 1), new Color(0, 1, 1)));
    platforms.push(new Platform(vec2(40, 8), vec2(10, 1), new Color(1, 1, 0)));
    platforms.push(new Platform(vec2(50, 3), vec2(10, 1), new Color(1, 0, 1)));
    platforms.push(new Platform(vec2(70, 3), vec2(5, 1), new Color(0, 1, 1)));
    platforms.push(new Platform(vec2(90, 8), vec2(5, 1), new Color(1, 0, 0)));
    platforms.push(new Platform(vec2(95, 25), vec2(5, 1), new Color(0, 0, 0)));
    platforms.push(new Platform(vec2(110, 2), vec2(20, 1), new Color(0, 1, 0)));
    platforms.push(
      new Platform(vec2(140, 2), vec2(5, 1), new Color(1, 0.5, 0.5))
    );
    platforms.push(
      new Platform(vec2(180, 2), vec2(5, 1), new Color(0, 1, 0.5))
    );
    platforms.push(
      new Platform(vec2(240, 2), vec2(5, 1), new Color(0, 1, 0.5))
    );
    platforms.push(
      new Platform(vec2(240, -50), vec2(5, 1), new Color(0, 1, 0.5))
    );
    platforms.push(
      new Platform(vec2(-50, 32), vec2(300, 1), new Color(0, 0, 0)) // ceiling
    );
    return platforms;
  }
}
